// svelte action은 첫번째인수로 node (html element)
export function autoFocusout(el, focusoutListener) {
  const focusListener = event => {
    // stopPropagation으로 아래 window 함수 호출 방지
    event.stopPropagation();
  };

  const colseListener = () => {
    if (focusoutListener.state) {
      focusoutListener.offEditMode();
    }
  };

  setTimeout(() => {
    el.addEventListener("click", focusListener);
    window.addEventListener("click", colseListener);
  });

  return {
    destroy() {
      el.removeEventListener("click", focusListener);
      window.removeEventListener("click", colseListener);
    }
  };
}
