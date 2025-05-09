import { Slider } from "@nextui-org/react";
import { useStorageState } from "../../hooks/useStorage";
import HorizontalLine from "./HorizontalLine";

function SliderControl({
  label,
  storageKey,
  step,
  maxValue,
  minValue,
  borderBottom,
  zeroValueMessage,
}) {
  const [value, setValue, isLoaded] = useStorageState(storageKey);

  return (
    <>
      {isLoaded && (
        <>
          <div className="bg-content1 p-3">
            <Slider
              defaultValue={value}
              onChangeEnd={setValue}
              label={label}
              step={step ?? 1}
              maxValue={maxValue}
              minValue={minValue ?? 1}
              color="primary"
              // size=""
              classNames={{
                base: "max-w-md",
                thumb: "w-5 h-5 shadow shadow-gray-500 after:bg-white",
              }}
            />
            {value === 0 && zeroValueMessage && (
              <p className="text-default-500 text-xs mt-2">
                {zeroValueMessage}
              </p>
            )}
          </div>
          <HorizontalLine borderBottom={borderBottom} />
        </>
      )}
    </>
  );
}

export default SliderControl;

// size lg
// "flex justify-center items-center before:absolute before:w-11 before:h-11 before:rounded-full after:shadow-small after:bg-background data-[focused=true]:z-10 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-5 w-5 after:w-4 after:h-4 rounded-full after:rounded-full bg-primary top-1/2 cursor-grab data-[dragging=true]:cursor-grabbing ring-transparent border-0 after:transition-all motion-reduce:after:transition-none data-[dragging=true]:after:scale-80"

// flex justify-center items-center before:absolute before:w-11 before:h-11 before:rounded-full after:shadow-small after:bg-background data-[focused=true]:z-10 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 w-6 h-6 after:w-6 after:h-6 scale-80 rounded-full after:rounded-full bg-primary top-1/2 cursor-grab data-[dragging=true]:cursor-grabbing ring-transparent border-0 after:transition-all motion-reduce:after:transition-none data-[dragging=true]:after:scale-80 shadow-small
