import { Switch, cn } from "@nextui-org/react";
import { useStorageState } from "../../hooks/useStorage";
import HorizontalLine from "./HorizontalLine";

function SwitchControl({
  label,
  storageKey,
  color,
  thumbIconOn,
  thumbIconOff,
  onChange,
  borderBottom,
  description,
}) {
  const [selected, setSelected, isLoaded] = useStorageState(storageKey);

  return (
    <>
      {isLoaded && (
        <>
          <Switch
            isSelected={selected}
            onValueChange={setSelected}
            onChange={onChange}
            color={color ?? "primary"}
            thumbIcon={selected ? thumbIconOn : thumbIconOff}
            classNames={{
              base: cn(
                "inline-flex flex-row-reverse w-full max-w-full items-center",
                "justify-between cursor-pointer gap-1 p-3"
              ),
              wrapper: "mr-0",
              label: "text-small",
            }}
          >
            {label}
            {
              description && (
                <p className="text-default-500 text-xs">
                  {description}
                </p>
              )}
          </Switch>
          <HorizontalLine borderBottom={borderBottom} />
        </>
      )}
    </>
  );
}

export default SwitchControl;
