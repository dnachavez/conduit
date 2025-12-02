"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type Workspace = {
  id: string;
  name: string;
  description?: string;
};

export default function WorkspaceSetupPage() {
  const [activeTab, setActiveTab] = useState<"create" | "select">("create");

  // TODO: Fetch available workspaces from API
  const availableWorkspaces: Workspace[] = [
    // Example data - replace with actual API call
    { id: "1", name: "Acme Corp", description: "Customer support team" },
    { id: "2", name: "Tech Startup", description: "Sales and support" },
  ];

  const getWorkspaceInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-sans text-zinc-50">
      <main className="flex w-full max-w-md flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/logo.svg"
            alt="Conduit logo"
            width={50}
            height={50}
            priority
          />
          <h1 className="text-center text-2xl font-semibold tracking-tight">
            Create or select a workspace
          </h1>
        </div>

        <div className="w-full rounded-xl bg-[#171717] p-6 shadow-sm">
          {/* Tabs */}
          <div className="mb-6 flex gap-1 border-b border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`flex-1 border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeTab === "create"
                  ? "border-[#542CDE] text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("select")}
              className={`flex-1 border-b-2 pb-2 text-sm font-medium transition-colors ${
                activeTab === "select"
                  ? "border-[#542CDE] text-zinc-100"
                  : "border-transparent text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Select
            </button>
          </div>

          {/* Create Tab Content */}
          {activeTab === "create" && (
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="workspace-name" className="font-medium text-zinc-200">
                  Workspace Name
                </label>
                <input
                  id="workspace-name"
                  type="text"
                  placeholder="My Workspace"
                  className="h-10 rounded-md border border-zinc-800 bg-black px-3 text-sm text-zinc-50 outline-none ring-offset-0 placeholder:text-zinc-500 focus:border-[#542CDE] focus:ring-2 focus:ring-[#542CDE] focus:ring-offset-0"
                />
              </div>

              <div className="flex flex-col gap-2 text-sm">
                <label htmlFor="workspace-description" className="font-medium text-zinc-200">
                  Workspace Description
                </label>
                <textarea
                  id="workspace-description"
                  placeholder="Describe your workspace..."
                  rows={3}
                  className="rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-50 outline-none ring-offset-0 placeholder:text-zinc-500 focus:border-[#542CDE] focus:ring-2 focus:ring-[#542CDE] focus:ring-offset-0 resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex h-10 items-center justify-center rounded-md bg-[#542CDE] px-4 text-sm font-medium text-white transition-colors hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#542CDE] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Create Workspace
              </button>
            </form>
          )}

          {/* Select Tab Content */}
          {activeTab === "select" && (
            <div className="flex flex-col gap-2">
              {availableWorkspaces.length > 0 ? (
                availableWorkspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    type="button"
                    className="flex items-center gap-3 rounded-md border border-zinc-800 bg-black p-3 text-left transition-colors hover:border-zinc-700 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#542CDE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#171717]"
                  >
                    <div className="flex aspect-square size-10 shrink-0 items-center justify-center rounded-lg bg-[#542CDE] text-sm font-medium text-white">
                      {getWorkspaceInitials(workspace.name)}
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <span className="text-sm font-medium text-zinc-100">
                        {workspace.name}
                      </span>
                      {workspace.description && (
                        <span className="text-xs text-zinc-400">
                          {workspace.description}
                        </span>
                      )}
                    </div>
                    <ChevronRight className="size-4 shrink-0 text-zinc-500" />
                  </button>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-zinc-500">
                  No workspaces available
                </p>
              )}
            </div>
          )}
        </div>

        <p className="text-xs text-zinc-500">
          <Link
            href="/terms-of-service"
            className="text-zinc-400 underline-offset-4 hover:underline"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy-policy"
            className="text-zinc-400 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
        </p>
      </main>
    </div>
  );
}

