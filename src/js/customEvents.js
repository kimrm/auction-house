export function loggedInEvent(profile) {
  return new CustomEvent("loggedIn", {
    bubbles: true,
    detail: {
      profile,
    },
  });
}

export function routeChangedEvent(route) {
  return new CustomEvent("routeChanged", {
    bubbles: true,
    detail: {
      route: route,
    },
  });
}

export function registeredEvent() {
  return new CustomEvent("registered", {
    bubbles: true,
    detail: {},
  });
}

export function detailsModalClosedEvent() {
  return new CustomEvent("detailsModalClosed", {
    bubbles: true,
    detail: {},
  });
}
