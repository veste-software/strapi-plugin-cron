import { BaseCheckbox } from "@strapi/design-system/BaseCheckbox";
import { Box } from "@strapi/design-system/Box";
import { Flex } from "@strapi/design-system/Flex";
import { IconButton } from "@strapi/design-system/IconButton";
import {
  Table,
  Tbody,
  Td,
  TFooter,
  Th,
  Thead,
  Tr,
} from "@strapi/design-system/Table";
import { Typography } from "@strapi/design-system/Typography";
import { VisuallyHidden } from "@strapi/design-system/VisuallyHidden";
import CarretDown from "@strapi/icons/CarretDown";
import Pencil from "@strapi/icons/Pencil";
import Plus from "@strapi/icons/Plus";
import Trash from "@strapi/icons/Trash";
import React, { useState } from "react";
import { CronJob } from "../../../../types";

type CronJobsTableProps = {
  cronJobs: CronJob[];
};

export default function CronJobsTable(props: CronJobsTableProps) {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;

  const [entries, setEntry] = useState(
    props.cronJobs.map((cronJob) => ({
      ...cronJob,
      checked: false,
    }))
  );

  return (
    <Box padding={8} background="neutral100">
      <Table
        colCount={COL_COUNT}
        rowCount={ROW_COUNT}
        footer={<TFooter icon={<Plus />}>Add new Cron Job</TFooter>}
      >
        <Thead>
          <Tr>
            <Th>
              <BaseCheckbox aria-label="Select all entries" />
            </Th>
            <Th
              action={
                <IconButton label="Sort on ID" icon={<CarretDown />} noBorder />
              }
            >
              <Typography variant="sigma">ID</Typography>
            </Th>
            <Th
              action={
                <IconButton
                  label="Sort on Name"
                  icon={<CarretDown />}
                  noBorder
                />
              }
            >
              <Typography variant="sigma">Name</Typography>
            </Th>
            <Th>
              <Typography variant="sigma">Schedule</Typography>
            </Th>
            <Th>
              <VisuallyHidden>Actions</VisuallyHidden>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {entries.map((cronJob) => (
            <Tr key={cronJob.id}>
              <Td>
                <BaseCheckbox
                  aria-label={`Select ${cronJob.id}`}
                  checked={cronJob.checked}
                  onClick={(e) => {
                    setEntry((entries) =>
                      entries.map((entry) =>
                        entry.id === cronJob.id
                          ? {
                              ...entry,
                              checked: !entry.checked,
                            }
                          : entry
                      )
                    );
                  }}
                />
              </Td>
              <Td>
                <Typography textColor="neutral800">{cronJob.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{cronJob.name}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {cronJob.schedule}
                </Typography>
              </Td>
              <Td>
                <Flex>
                  <IconButton
                    onClick={() => console.log("edit")}
                    label="Edit"
                    noBorder
                    icon={<Pencil />}
                  />
                  <Box paddingLeft={1}>
                    <IconButton
                      onClick={() => console.log("delete")}
                      label="Delete"
                      noBorder
                      icon={<Trash />}
                    />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}