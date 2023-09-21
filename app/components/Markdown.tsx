import React from "react";
import ReactMarkdown from "react-markdown";

type Props = {
  markdown: string;
};

export const Markdown = ({ markdown }: Props) => {
  if (!markdown) return <></>;

  return <ReactMarkdown>{markdown}</ReactMarkdown>;
};
