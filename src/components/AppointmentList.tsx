import { useData } from "../hooks/usedata";

export default function AppointmentList() {
  const { appointments } = useData();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex flex-col rounded-lg bg-white shadow-sm border border-slate-200 w-full max-w-md">
        <nav className="flex min-w-[240px] flex-col gap-1 p-1.5">
          {appointments?.data?.pages?.length > 0 ? (
            appointments?.data?.pages.flat().map((item) => (
              <div
                key={item.id}
                role="button"
                className="text-slate-800 flex w-full items-center rounded-md p-2 pl-3"
              >
                <div className="flex flex-col">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>

                <div className="ml-auto grid place-items-center justify-self-end">
                  <button
                    className="rounded-md border border-transparent p-2.5 text-center text-sm transition-all text-slate-600 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-calendar-icon lucide-calendar"
                    >
                      <path d="M8 2v4" />
                      <path d="M16 2v4" />
                      <rect width="18" height="18" x="3" y="4" rx="2" />
                      <path d="M3 10h18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No appointments available</p>
          )}
        </nav>
        {appointments.hasNextPage && (
          <div className="mx-3 mb-3 mt-4 text-purple-800">
            <button
              onClick={() => appointments.fetchNextPage()}
              type="button"
              className="inline-flex cursor-pointer rounded text-xs font-bold uppercase tracking-widest"
            >
              <svg
                className="mr-3 block h-4 w-4 align-middle uppercase tracking-wider"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Load more users
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
