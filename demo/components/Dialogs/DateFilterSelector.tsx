import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

interface DateFilterDialogProps {
    showDateFilterDialog: boolean;
    handleDateFilterCancel: () => void;
    handleDateFilterApply: () => void;
    selectedDate: Date | null;
    setSelectedDate: (date: Date | null) => void;
    dateFilterOption: string;
    setDateFilterOption: (option: string) => void;
}

const DateFilterDialog: React.FC<DateFilterDialogProps> = (props) => {
    const {
        showDateFilterDialog,
        handleDateFilterCancel,
        handleDateFilterApply,
        selectedDate,
        setSelectedDate,
        dateFilterOption,
        setDateFilterOption,
    } = props;

    const filterOptions = [
        { name: "Datum je jednak", value: "Datum je jednak" },
        { name: "Datum je prije", value: "Datum je prije" },
        { name: "Datum je poslije", value: "Datum je poslije" },
    ];

    return (
        <Dialog
            header="Filtriraj po datumu"
            visible={showDateFilterDialog}
            style={{ width: "380px" }}
            onHide={handleDateFilterCancel}
        >
            <div className="flex flex-column gap-2 mb-3">
                <label htmlFor="filter-option" className="text-xl">Odabir filtra:</label>
                <Dropdown
                    id="filter-option"
                    options={filterOptions}
                    value={dateFilterOption}
                    onChange={(e) => setDateFilterOption(e.value)}
                    optionLabel="name"
                    placeholder="Odaberite opciju"
                    className="w-full"
                />
            </div>
            <div>
            <div className="flex flex-column gap-2 mb-5">
                <label htmlFor="calendar" className="text-xl">Odaberi datum:</label>
                <Calendar
                    id="calendar"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.value || null)}
                    dateFormat="dd/mm/yy"
                    showIcon
                    className="w-full"
                />
            </div>
            </div>
            <div className="flex justify-content-end gap-2 mt-3">
                <Button label="Odustani" icon="pi pi-times" onClick={handleDateFilterCancel} />
                <Button label="Primijeni filter" icon="pi pi-check" onClick={handleDateFilterApply} />
            </div>
        </Dialog>
    );
};

export default DateFilterDialog;
