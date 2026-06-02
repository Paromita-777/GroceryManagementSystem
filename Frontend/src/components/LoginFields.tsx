import type { LoginFieldsProps } from "../types/LoginTypes";

export default function LoginFields({
  username,
  password,
  setUsername,
  setPassword
}: LoginFieldsProps) {

  return (
    <>
      {/* Username Field */}
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>

      {/* Password Field */}
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
    </>
  );
}