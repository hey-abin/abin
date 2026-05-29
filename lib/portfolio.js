import "server-only";
import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export const fallbackProfile = {
  key: "main",
  name: "ABIN KJ",
  role: "Full Stack Developer",
  eyebrow: "Engineering Digital Excellence",
  summary:
    "Full Stack Developer specializing in architecting high-performance ecosystems with React, Next.js, and robust cloud infrastructures.",
  aboutTitle: "I Build Premium Digital Products",
  aboutIntro:
    "Hello! I'm Abin KJ, a passionate Full Stack Developer with a deep eye for detail and design. I specialize in creating interactive, 3D, and high-performance web applications that provide a seamless user experience.",
  aboutBody:
    "My expertise spans across the entire stack, from building responsive frontends with React and Next.js, to architecting backend systems with MongoDB, SQL, and various cloud platforms.",
  photoUrl: "/abin_user_final.png",
  resumeUrl: "/dev-abin.pdf",
  email: "abinkich132@gmail.com",
  githubUrl: "https://github.com/hey-abin",
  linkedinUrl: "https://www.linkedin.com/in/abinkj2005",
  projectsCompleted: "32+",
  yearsExperience: "4+",
};

export const fallbackProjects = [
  {
    id: "petlink-adoption",
    title: "Petlink Adoption",
    description:
      "A comprehensive pet adoption and listing platform designed to connect pets with loving homes seamlessly.",
    tech: ["Next.js", "Firebase", "Tailwind CSS"],
    image: "/petlink_actual.png",
    color: "from-blue-600/80 to-cyan-600/80",
    size: "md:col-span-2 md:row-span-2",
    demo: "https://petlinkk.vercel.app/",
    source: "",
    active: true,
    sortOrder: 1,
  },
  {
    id: "mycoco-pet-game",
    title: "Mycoco Pet Game",
    description:
      "A high-end 3D pet care game built with Three.js for an immersive browser-based experience.",
    tech: ["Three.js", "React Three Fiber"],
    image: "/mycoco_actual.png",
    color: "from-purple-600/80 to-indigo-600/80",
    size: "md:col-span-1 md:row-span-1",
    demo: "https://mycocopet.vercel.app/",
    source: "",
    active: true,
    sortOrder: 2,
  },
  {
    id: "momos-delivery",
    title: "Momos Delivery",
    description:
      "A complete food delivery solution with real-time tracking and a modern interactive UI.",
    tech: ["React", "MongoDB", "Node.js"],
    image: "/momos_actual.png",
    color: "from-rose-600/80 to-pink-600/80",
    size: "md:col-span-1 md:row-span-1",
    demo: "https://momos-theta.vercel.app/",
    source: "",
    active: true,
    sortOrder: 3,
  },
];

function serializeProject(project) {
  return {
    ...project,
    id: project._id?.toString() || project.id,
    _id: undefined,
  };
}

export async function getProfile() {
  try {
    const db = await getDb();
    const profile = await db.collection("profile").findOne({ key: "main" });
    return { ...fallbackProfile, ...profile, _id: undefined };
  } catch (error) {
    console.warn("Using fallback profile:", error.message);
    return fallbackProfile;
  }
}

export async function getProjects({ includeInactive = false } = {}) {
  try {
    const db = await getDb();
    const query = includeInactive ? {} : { active: { $ne: false } };
    const projects = await db
      .collection("projects")
      .find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .toArray();

    if (!projects.length && !includeInactive) {
      return fallbackProjects;
    }

    return projects.map(serializeProject);
  } catch (error) {
    console.warn("Using fallback projects:", error.message);
    return includeInactive ? [] : fallbackProjects;
  }
}

export async function upsertProfile(profile) {
  const db = await getDb();
  const nextProfile = {
    ...profile,
    key: "main",
    updatedAt: new Date(),
  };

  await db
    .collection("profile")
    .updateOne({ key: "main" }, { $set: nextProfile }, { upsert: true });
}

export async function createProject(project) {
  const db = await getDb();
  await db.collection("projects").insertOne({
    ...project,
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

export async function deleteProject(id) {
  const db = await getDb();
  await db.collection("projects").deleteOne({ _id: new ObjectId(id) });
}
