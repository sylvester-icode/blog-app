import { auth } from "@/auth";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { generateApiToken } from "../actions/token";
import { getList } from "../services/readinglist";
import { toggleRead } from "../actions/readinglist";

export const instant = false;

export default async function MePage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, parseInt(session?.user?.id!, 10)),
  });

  if (!user) {
    redirect("/login");
  }

  const list = await getList();

  const unread = list.filter((item) => item.read === false);
  const read = list.filter((item) => item.read === true);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl border border-base-300">
        <div className="card-body gap-6">
          {/* Header Profile Workspace Row */}
          <div data-testid="user-profile">
            <h1 className="card-title text-3xl font-bold text-base-content">
              My profile
            </h1>
            <p data-testid="user-name" className="text-sm text-neutral-content mt-1">
              Name : {user.name}
            </p>
            <p data-testid="user-username" className="text-sm text-neutral-content mt-1">
              Username : {user.username}
            </p>
          </div>

          <div className="divider my-0"></div>

          {/* Reading List Section */}
          <div data-testid="reading-list-section" className="flex flex-col gap-4">
            <h2 className="card-title text-3xl font-bold text-base-content">
              Reading list
            </h2>

            {list.length === 0 ? (
              <p data-testid="empty-reading-list" className="text-sm text-neutral-content italic">
                Your reading list is empty.
              </p>
            ) : (
              <>
                <div data-testid="unread-section">
                  <p className="text-sm mb-4 text-neutral-content mt-1">
                    Unread ({unread.length})
                  </p>
                  {unread.length === 0 ? (
                    <p data-testid="no-unread-blogs" className="text-sm text-neutral-content italic">
                      No unread blogs.
                    </p>
                  ) : (
                    unread.map((item) => (
                      <div
                        key={item.id}
                        className="bg-blue-600 py-2 flex items-center px-4 mb-3 rounded-xl justify-between text-white"
                      >
                        <span>{item.title}</span>
                        <form action={toggleRead}>
                          <input type="number" hidden name="id" defaultValue={item.id} />
                          <button
                            type="submit"
                            data-testid={`mark-read-${item.id}`}
                            className="btn btn-sm"
                          >
                            Mark as read
                          </button>
                        </form>
                      </div>
                    ))
                  )}
                </div>

                <div data-testid="read-section">
                  <p className="text-sm mb-4 text-neutral-content mt-1">
                    Read ({read.length})
                  </p>
                  {read.map((item) => (
                    <div
                      key={item.id}
                      className="bg-red-600 py-2 flex items-center px-4 mb-3 rounded-xl justify-between text-white"
                    >
                      <span>{item.title}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="divider my-0"></div>

          {/* Personal API Token Section */}
          <div data-testid="api-token-section" className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
              API Token
            </h3>

            {user.token ? (
              <div data-testid="token-display" className="flex flex-col gap-2">
                <div className="badge badge-success gap-1 text-xs font-semibold py-3 px-3">
                  Current Token :
                </div>

                <div className="mockup-code bg-neutral text-neutral-content text-sm p-4 rounded-lg shadow-inner">
                  <pre className="whitespace-pre-wrap break-all px-4">
                    <code data-testid="api-token">{user.token}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div data-testid="no-token-message" className="alert alert-warning shadow-md rounded-lg">
                <span className="text-sm font-medium italic">
                  No token has been generated yet.
                </span>
              </div>
            )}

            <div className="card-actions justify-end mt-4">
              <form action={generateApiToken} className="w-full sm:w-auto">
                <button
                  data-testid="generate-token-button"
                  type="submit"
                  className={`btn w-full sm:w-auto font-bold tracking-wide shadow-md ${
                    user.token ? "btn-outline btn-primary" : "btn-primary"
                  }`}
                >
                  {user.token ? "Regenerate Token" : "Generate Token"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
