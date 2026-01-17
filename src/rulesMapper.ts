import { fileExists } from "./rules/file-exists";
import { readmeExists } from "./rules/readme-exists";

export const rulesMapper = {
  'file-exists': fileExists,
  'readme/exists': readmeExists,
};
