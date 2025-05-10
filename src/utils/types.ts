export type ActionType = {
  success: boolean;
  message: string;
};

export type loginType = ActionType & { twoStep?: boolean };
