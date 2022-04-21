import React, { useCallback, useEffect, useState } from "react";

import { Container, HeadingPage } from "components";

import watchIcon from "assets/icon/watch.png";
import { getLogs, runLog } from "services";
import { useSnackbar } from "notistack";
import { Table } from "./components";

function Watch() {
  const { enqueueSnackbar } = useSnackbar();
  const [logs, setLogs] = useState();

  const fetchLogs = useCallback(
    (path) => {
      getLogs(path || "default").then(({ data }) => {
        const { logs, message } = data;
        if (!!message) enqueueSnackbar(message, { variant: "info" });
        setLogs(logs);
      });
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <Container>
      <HeadingPage page="watch" title="Watch" icon={watchIcon} />
      {!!logs && logs?.length > 0 && (
        <Table data={logs} runLog={(log) => runLog(log)} />
      )}
    </Container>
  );
}

export default Watch;
