import { useCarToolStoreContext } from "../contexts/carToolStoreContext"
export const useCarTool = () => {
    return useCarToolStoreContext()
}