"use client";

import { useState } from "react";

import { api } from "~/trpc/react";
import { Post } from "~/types";

interface CreatePostProps {
  onSubmit(post: Post): void;
}

export function CreatePost({ onSubmit }: CreatePostProps) {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");

  const mutation = api.post.create.useMutation({
    onSuccess: (post) => {
      onSubmit(post);
      setShowModal(false);
    },
  });

  const handleModalClose = () => setShowModal(false);

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    mutation.mutate({ name: text });
  };

  return (
    <div>
      <button
        tabIndex={showModal ? -1 : undefined}
        className="border border-gray-800 bg-gray-500 p-2"
        onClick={() => setShowModal(true)}
      >
        Post
      </button>

      {showModal && (
        <div className="">
          <div className="fixed inset-0 bg-black/30" onClick={handleModalClose}>
            {/* overlay */}
          </div>

          <div className="fixed left-1/2 top-1/2 z-[1] h-full max-h-[500px] w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white sm:max-w-lg">
            <div className="w-full p-4">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">Add Post</div>
                <button
                  onClick={handleModalClose}
                  type="button"
                  className="ml-auto block text-sm"
                >
                  close
                </button>
              </div>
              <form className="mt-10" onSubmit={handleFormSubmit}>
                <label className="w-full">
                  <span>Enter Post title</span>
                  <input
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                    type="text"
                    name="post"
                    placeholder="A random post"
                    className="w-full rounded-md border border-black/30 px-3 py-2"
                    id=""
                  />
                </label>
                <button
                  className="mt-4 rounded-md bg-black px-3 py-2 text-white"
                  type="submit"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Loading..." : " Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
