export type LoginResponse = {
  token: string;
  employee: {
    empId: number;
    username: string;
    roles: string[];
  };
};