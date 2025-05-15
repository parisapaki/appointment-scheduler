import { useState, useMemo, useEffect } from "react";
import { useData } from "../hooks/useData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface Appointment {
  id: string;
  services: Service[];
}

export default function Service() {
  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<string>("");
  const queryClient = useQueryClient();
  const { appointments } = useData();

  const currentAppointment = useMemo<Appointment | undefined>(() => {
    return appointments?.data?.pages
      ?.flat()
      ?.find((item: Appointment) => item.id === id);
  }, [appointments, id]);

  const [localServices, setLocalServices] = useState<Service[]>(
    currentAppointment?.services || []
  );

  useEffect(() => {
    setLocalServices(currentAppointment?.services || []);
  }, [currentAppointment]);

  const addServiceMutation = useMutation({
    mutationKey: ["addService", id],
    mutationFn: (newTodo: Service) =>
      axios.patch(`http://localhost:3001/appointments/${id}`, {
        services: [...(currentAppointment?.services || []), newTodo],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setTask("");
    },
    onError: (error) => {
      console.error("Error adding service:", error);
    },
  });

  const handleCheckboxChange = (serviceId: string) => {
    setLocalServices((prev: Service[]) =>
      prev.map((service: Service) =>
        service.id === serviceId
          ? { ...service, completed: !service.completed }
          : service
      )
    );
  };

  const handleAdd = () => {
    if (!task.trim()) return;
    const newTodo: Service = {
      id: Date.now().toString(),
      title: task,
      description: "No description",
      completed: false,
    };
    addServiceMutation.mutate(newTodo);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">
          To-Do List
        </h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd();
        }}
      >
        <div className="flex items-center border-b-2 border-purple-900 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className="flex-shrink-0 bg-purple-700 border-purple-700 border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>

      <ul className="divide-y divide-gray-200 px-4">
        {localServices.map((item: Service) => (
          <li key={item.id} className="py-4">
            <div className="flex items-center">
              <input
                id={`todo-${item.id}`}
                name={`todo-${item.id}`}
                type="checkbox"
                className="h-4 w-4 text-purple-800 border-gray-300 rounded"
                checked={item.completed}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <label
                htmlFor={`todo-${item.id}`}
                className="ml-3 block text-gray-900"
              >
                <span className="text-lg font-medium">{item.title}</span>
                <br />
                <span className="text-sm font-light text-gray-500">
                  {item.description}
                </span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
