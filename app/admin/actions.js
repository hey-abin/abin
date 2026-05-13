"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdmin, clearAdminSession } from "@/lib/admin-auth";
import { createProject, deleteProject, upsertProfile } from "@/lib/portfolio";

function text(formData, key) {
  return String(formData.get(key) || "").trim();
}

function list(formData, key) {
  return text(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function logoutAdmin() {
  await clearAdminSession();
  redirect("/admin");
}

export async function updateProfile(formData) {
  await assertAdmin();

  await upsertProfile({
    name: text(formData, "name"),
    role: text(formData, "role"),
    eyebrow: text(formData, "eyebrow"),
    summary: text(formData, "summary"),
    aboutTitle: text(formData, "aboutTitle"),
    aboutIntro: text(formData, "aboutIntro"),
    aboutBody: text(formData, "aboutBody"),
    photoUrl: text(formData, "photoUrl"),
    resumeUrl: text(formData, "resumeUrl"),
    email: text(formData, "email"),
    githubUrl: text(formData, "githubUrl"),
    linkedinUrl: text(formData, "linkedinUrl"),
    projectsCompleted: text(formData, "projectsCompleted"),
    yearsExperience: text(formData, "yearsExperience"),
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?saved=profile");
}

export async function addProject(formData) {
  await assertAdmin();

  await createProject({
    title: text(formData, "title"),
    description: text(formData, "description"),
    tech: list(formData, "tech"),
    image: text(formData, "image"),
    demo: text(formData, "demo"),
    source: text(formData, "source"),
    color: text(formData, "color") || "from-purple-600/80 to-indigo-600/80",
    size: text(formData, "size") || "md:col-span-1 md:row-span-1",
    sortOrder: Number(text(formData, "sortOrder")) || 99,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?saved=project");
}

export async function removeProject(formData) {
  await assertAdmin();

  await deleteProject(text(formData, "id"));
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?saved=deleted");
}
