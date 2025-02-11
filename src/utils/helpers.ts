import debounce from "lodash/debounce";

export function createDebouncedSetter<T>(
  setter: (value: T) => void,
  delay: number
) {
  return debounce((value: T) => {
    setter(value);
  }, delay);
}
