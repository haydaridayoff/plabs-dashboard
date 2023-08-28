// errorMessages.ts

interface ErrorMessage {
  status: number;
  message: string;
}

export const errorMessages: ErrorMessage[] = [
  {
    status: 400,
    message:
      "Bad Request: The request could not be understood or was missing required parameters.",
  },
  {
    status: 401,
    message:
      "Unauthorized: Authentication failed or user lacks necessary permissions.",
  },
  {
    status: 403,
    message: "Forbidden: Access is forbidden to the requested resource.",
  },
  { status: 404, message: "Not Found: The requested resource was not found." },
  {
    status: 500,
    message: "Internal Server Error: An unexpected condition was encountered.",
  },
  // Add more error messages as needed
];
