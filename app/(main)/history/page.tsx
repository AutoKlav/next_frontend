import HistoryTable from "@/demo/components/Tables/HistoryTable";
import { getAllProcessLogs } from "@/services/grpc";
import { getProcessLogsAction } from "../api/actions";

const HistoryPage = async () => {
    const processLogs = await getProcessLogsAction(1);
    console.log(processLogs);
    return (
        <div>
            <HistoryTable />
        </div>
    );    
}

export default HistoryPage;