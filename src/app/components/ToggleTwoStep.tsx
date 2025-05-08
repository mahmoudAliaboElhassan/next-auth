"use client";
import { useState } from "react";
import { ToggleTwoStepAction } from "../actions/toggleTwoStep";

interface ToggleTwoStep {
  userId: string;
  isTwoStepEnabled: boolean;
}

function ToggleTwoStep({ userId, isTwoStepEnabled }: ToggleTwoStep) {
  const [isEnabled, setIsEnabled] = useState(isTwoStepEnabled);
  console.log("isEnabled", isEnabled);
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("from client", userId, isEnabled);
    ToggleTwoStepAction(userId, isEnabled)
      .then((data) => {
        alert(data.message);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <input
          type="checkbox"
          name=""
          id="twoStep"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
        <label htmlFor="twoStep"> Enable / Disable 2 Step</label>
        <div>
          <input
            type="submit"
            className="cursor-pointer"
            value="save changes"
          />
        </div>
      </form>
    </div>
  );
}
export default ToggleTwoStep;
