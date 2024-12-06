"use client";

import { getResponses } from "@/app/tweets/[id]/actions";
import { useEffect, useState, useOptimistic } from "react";
import ResponseForm from "./response-form";

export interface IResponse {
  id: string;
  response: string;
  user?: {
    username: string;
  };
  createdAt?: Date;
}

export default function ResponseList({
  tweetId,
  username,
}: {
  tweetId: string;
  username: string;
}) {
  const [responses, setResponses] = useState<IResponse[]>([]);
  const [optimisticResponses, addOptimisticResponse] = useOptimistic<
    IResponse[],
    IResponse
  >(responses, (state, newResponse) => [newResponse, ...state]);

  useEffect(() => {
    const loadResponses = async () => {
      const responses = await getResponses(tweetId);
      const sortedResponses = responses.sort(
        (a: IResponse, b: IResponse) =>
          new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
      );
      setResponses(sortedResponses);
    };

    loadResponses();
  }, [tweetId]);

  const handleAddResponse = async (newResponse: IResponse) => {
    const tempResponse = {
      ...newResponse,
      id: `temp-${Date.now()}`,
    };
    addOptimisticResponse(tempResponse);
    setResponses((prev) => [tempResponse, ...prev]);
  };

  const handleRemoveResponse = (id: string) => {
    setResponses((prev) => prev.filter((response) => response.id !== id));
  };

  return (
    <div>
      <ResponseForm
        tweetId={tweetId}
        username={username}
        lastId={optimisticResponses[0]?.id}
        addOptimisticResponse={handleAddResponse}
        removeOptimisticResponse={handleRemoveResponse}
      />
      <div className="space-y-4">
        {optimisticResponses.map((response) => (
          <div key={response.id} className="border-b pb-4">
            <p className="mb-2">{response.response}</p>
            <div className="text-sm text-gray-500">
              <span>{response.user?.username}</span>
              <span className="mx-2">•</span>
              <span>{response.createdAt!.toLocaleDateString("ko-KR")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
