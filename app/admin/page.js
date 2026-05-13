import { addProject, logoutAdmin, removeProject, updateProfile } from "./actions";
import { isAdminSession } from "@/lib/admin-auth";
import { getProfile, getProjects } from "@/lib/portfolio";

export const dynamic = "force-dynamic";

function Field({ label, name, defaultValue, type = "text", textarea = false, placeholder = "" }) {
  const className =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100";

  return (
    <label className="grid gap-2 text-sm font-bold text-zinc-700">
      {label}
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} placeholder={placeholder} rows={4} className={className} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} className={className} />
      )}
    </label>
  );
}

function Login({ error }) {
  return (
    <main className="relative z-50 min-h-screen bg-zinc-950 px-6 py-16 text-white flex items-center justify-center overflow-hidden">
      <form 
        action="/admin/login" 
        method="post" 
        className="relative z-50 mx-auto grid w-full max-w-md gap-6 rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
      >
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-purple-300">Portfolio Admin</p>
          <h1 className="mt-3 text-3xl font-black">Sign in</h1>
          <p className="mt-2 text-sm text-zinc-400">Use the password from your environment file.</p>
        </div>
        {error === "invalid" && (
          <p className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200">
            Invalid admin password.
          </p>
        )}
        <input
          name="password"
          type="password"
          placeholder="Admin password"
          className="relative z-[100] w-full rounded-xl border-2 border-white/20 bg-zinc-900 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all cursor-text pointer-events-auto"
          required
          autoFocus
        />
        <button type="submit" className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-purple-500">
          Enter Admin
        </button>
      </form>
    </main>
  );
}

export default async function AdminPage({ searchParams }) {
  const params = await searchParams;
  const isAuthed = await isAdminSession();

  if (!isAuthed) {
    return <Login error={params?.error} />;
  }

  const [profile, projects] = await Promise.all([
    getProfile(),
    getProjects({ includeInactive: true }),
  ]);

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-8 text-zinc-950 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8">
        <header className="flex flex-col gap-4 rounded-3xl bg-zinc-950 p-6 text-white shadow-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-purple-300">Portfolio Admin</p>
            <h1 className="mt-2 text-3xl font-black">Manage Abin KJ Portfolio</h1>
            {params?.saved && <p className="mt-2 text-sm font-bold text-emerald-300">Saved: {params.saved}</p>}
          </div>
          <form action={logoutAdmin}>
            <button type="submit" className="rounded-xl border border-white/10 px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10">
              Logout
            </button>
          </form>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <form action={updateProfile} className="grid gap-5 rounded-3xl bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-black">Profile and Photo</h2>
              <p className="mt-1 text-sm text-zinc-500">Use a public path like /abin_user_final.png or a full image URL.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Name" name="name" defaultValue={profile.name} />
              <Field label="Role" name="role" defaultValue={profile.role} />
              <Field label="Eyebrow" name="eyebrow" defaultValue={profile.eyebrow} />
              <Field label="Photo URL / path" name="photoUrl" defaultValue={profile.photoUrl} />
              <Field label="Resume URL / path" name="resumeUrl" defaultValue={profile.resumeUrl} />
              <Field label="Email" name="email" type="email" defaultValue={profile.email} />
              <Field label="GitHub URL" name="githubUrl" defaultValue={profile.githubUrl} />
              <Field label="LinkedIn URL" name="linkedinUrl" defaultValue={profile.linkedinUrl} />
              <Field label="Projects Completed" name="projectsCompleted" defaultValue={profile.projectsCompleted} />
              <Field label="Years Experience" name="yearsExperience" defaultValue={profile.yearsExperience} />
            </div>

            <Field label="Hero Summary" name="summary" defaultValue={profile.summary} textarea />
            <Field label="About Title" name="aboutTitle" defaultValue={profile.aboutTitle} />
            <Field label="About Intro" name="aboutIntro" defaultValue={profile.aboutIntro} textarea />
            <Field label="About Body" name="aboutBody" defaultValue={profile.aboutBody} textarea />

            <button type="submit" className="rounded-xl bg-zinc-950 px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-purple-700">
              Save Profile
            </button>
          </form>

          <form action={addProject} className="grid content-start gap-5 rounded-3xl bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-2xl font-black">Add Project</h2>
              <p className="mt-1 text-sm text-zinc-500">New projects appear on the home page after saving.</p>
            </div>
            <Field label="Title" name="title" placeholder="Project name" />
            <Field label="Description" name="description" textarea placeholder="What it does and why it matters" />
            <Field label="Tech stack" name="tech" placeholder="Next.js, MongoDB, Tailwind CSS" />
            <Field label="Image URL / path" name="image" placeholder="/project.png" />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Live Demo URL" name="demo" />
              <Field label="Source URL" name="source" />
              <Field label="Sort Order" name="sortOrder" type="number" placeholder="4" />
              <Field label="Card Size" name="size" defaultValue="md:col-span-1 md:row-span-1" />
            </div>
            <Field label="Color Classes" name="color" defaultValue="from-purple-600/80 to-indigo-600/80" />
            <button type="submit" className="rounded-xl bg-purple-600 px-5 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-purple-500">
              Add Project
            </button>
          </form>
        </section>

        <section className="rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black">Projects in Database</h2>
          <div className="mt-5 grid gap-4">
            {projects.length === 0 ? (
              <p className="rounded-2xl bg-zinc-100 p-5 text-sm font-bold text-zinc-500">
                No database projects yet. The public site is currently using fallback projects.
              </p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="flex flex-col gap-4 rounded-2xl border border-zinc-200 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-black">{project.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">{project.description}</p>
                    <p className="mt-2 text-xs font-bold uppercase tracking-widest text-purple-600">
                      {(project.tech || []).join(" / ")}
                    </p>
                  </div>
                  <form action={removeProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button type="submit" className="rounded-xl border border-red-200 px-4 py-2 text-xs font-black uppercase tracking-widest text-red-600 transition hover:bg-red-50">
                      Delete
                    </button>
                  </form>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
