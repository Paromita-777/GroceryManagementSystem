export type LoginResponse = {
  token: string;
  employee: {
    empId: number;
    username: string;
    roles: string[];
  };
};
export interface RegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}