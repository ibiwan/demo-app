import { useColorToolStoreContext } from "../contexts/colorToolStoreContext"
export const useColorTool = () => {
    return useColorToolStoreContext()
}