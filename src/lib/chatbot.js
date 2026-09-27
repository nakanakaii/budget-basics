import responses from "../data/chatbot.json";

export const replyTo = (question) => {
  const text = question.toLowerCase();
  return (
    responses.find(({ keywords }) =>
      keywords.some((keyword) => text.includes(keyword)),
    ) ?? responses.find(({ topic }) => topic === "fallback")
  );
};
