import HistoryTable from "@/demo/components/Tables/HistoryTable";
import { getProcessesAction } from "../api/actions";

const HistoryPage = async () => {
    //const data = await getProcessesAction();
    //console.log(data);
    return (
        <div>
            <HistoryTable />
        </div>
    );    
}

export default HistoryPage;