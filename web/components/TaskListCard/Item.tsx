import { Button, chakra, HStack } from "@chakra-ui/react";
import React, { Dispatch, memo, SetStateAction } from "react";
import { Task } from "../../utils/configs";
import { trackEvent } from "../../utils/umami";
import DoneButton from "./DoneButton";
import { getAssetByName } from "../../assets";
import { useTaskFocusSetter } from "../../utils/tasks";

const Item = ({
  task,
  setTask,
  onTaskClick,
}: {
  task: Task;
  setTask: Dispatch<SetStateAction<Task>>;
  onTaskClick?: (task: Task) => void;
}) => {
  const setFocused = useTaskFocusSetter();

  return (
    <HStack spacing={2} my={-1}>
      <chakra.img alt={task.icon} src={getAssetByName(task.icon)} w={10} h={10} objectFit="contain" flexShrink={0} />

      <chakra.div flex={1}>
        <div>
          <Button
            variant="link"
            size="lg"
            colorScheme="black"
            minW={0}
            onClick={() => {
              setFocused(task);
              onTaskClick?.(task);

              trackEvent("taskList", "taskFocus");
            }}
          >
            {task.name}
          </Button>
        </div>

        {task.description && (
          <chakra.div fontSize="sm" color="gray.500">
            {task.description}
          </chakra.div>
        )}
      </chakra.div>

      <chakra.div flexShrink={0}>
        <DoneButton task={task} setTask={setTask} />
      </chakra.div>
    </HStack>
  );
};

export default memo(Item);
