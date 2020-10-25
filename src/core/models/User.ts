export default interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  birthday: string;
  sex: number;
  is_admin: boolean;
  is_active?: boolean;
}