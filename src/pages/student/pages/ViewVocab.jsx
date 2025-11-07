import React from "react";
import { useParams } from "react-router";

export default function ViewVocab() {
  const { lessionId } = useParams();

  return <div>{lessionId}</div>;
}
