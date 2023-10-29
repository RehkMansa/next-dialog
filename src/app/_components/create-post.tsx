"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";

export function CreatePost() {
  const mutation = api.post.create.useMutation({
    onSuccess: () => null,
  });

  return (
    <div>
      <button>Post</button>

      <p>^ open dialog with post form</p>
    </div>
  );
}
