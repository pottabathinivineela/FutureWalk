import { askFutureWalkAI } from "./gemini";

async function test() {
  const reply = await askFutureWalkAI("I want to become an AI Engineer.");

  console.log(reply);
}

test();