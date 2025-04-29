import { useEffect } from "react"
import { useLocation, useBlocker } from "react-router-dom"

export function useConfirmNavigation(shouldConfirm: boolean, message: string) {
  const location = useLocation()

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => 
      shouldConfirm && currentLocation.pathname !== nextLocation.pathname
  )

  useEffect(() => {
    if (!shouldConfirm) return

    // Store the current location
    // const currentPath = location.pathname

    // This function will be called when the user tries to navigate away
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = message
      return message
    }

    // This function will be called when the user tries to navigate within the app
    // const handleBlockedNavigation = (nextLocation: any) => {
    //   // Don't block navigation to the same page
    //   if (nextLocation.pathname === currentPath) {
    //     return true
    //   }

    //   // Ask for confirmation
    //   if (window.confirm(message)) {
    //     return true
    //   }

    //   return false
    // }

    // Add event listener for browser navigation
    window.addEventListener("beforeunload", handleBeforeUnload)

    // Replace the old block implementation with this
    if (blocker.state === "blocked" && window.confirm(message)) {
      blocker.proceed()
    } else if (blocker.state === "blocked") {
      blocker.reset()
    }

    // Clean up
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [shouldConfirm, message, blocker, location.pathname])
}
