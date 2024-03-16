import { Cache, Toast, showToast } from "@raycast/api";
import { useGetUser } from "../hooks/user";

/**
 * Fetches user information and handles error cases.
 * Subscribes to user changes and logs updated user information.
 */
export function getUserInformations() {
  // Fetch User informations
  const { userError, refetchUser } = useGetUser();

  if (userError)
    showToast({
      style: Toast.Style.Failure,
      title: "Can't get user informations",
      message: userError,
      primaryAction: {
        title: "Retry",
        onAction: refetchUser,
      },
    });

  // Cache user informations and subscribe to user changes
  const cache = new Cache({ namespace: "user" });

  cache.subscribe((key, data) => {
    if (key === "user") {
      console.log("User informations updated", data);
    }
  });
}
