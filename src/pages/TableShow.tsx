import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFoot,
    TableHead,
    TableHeaderCell,
    TableRoot,
    TableRow,
} from "../components/Table"
import { getUploads } from "../api"
import { useState, useEffect } from "react"
import type { Upload } from "../api"

export function TableShow() {
    const [data, setData] = useState<Upload[]>([]);
    useEffect(() => {
        getUploads(10).then((data) => setData(data));
    }, []);

    return (
        <div className="w-full p-16 max-w-screen-lg mx-auto">
            <UploadRow data={data} />
        </div>
    )
}

function UploadRow({ data }: { data: Upload[] }) {
    return (
        <TableRoot>
            <Table>
                <TableCaption>Recent invoices.</TableCaption>
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>id</TableHeaderCell>
                        <TableHeaderCell>uploader_wallet_pubkey</TableHeaderCell>
                        <TableHeaderCell>transaction_id</TableHeaderCell>
                        <TableHeaderCell>page_id</TableHeaderCell>
                        <TableHeaderCell>meta_tags_json</TableHeaderCell>
                        <TableHeaderCell className="text-right">created_at</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.uploader_wallet_pubkey}</TableCell>
                            <TableCell className="text-right">{item.transaction_id}<a href={`https://arweave.net/${item.transaction_id}`} target="_blank" rel="noopener noreferrer">View</a></TableCell>
                            <TableCell>{item.page_id}</TableCell>
                            <TableCell>{item.meta_tags_json}</TableCell>
                            <TableCell className="text-right">{item.created_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFoot>
                    <TableRow>
                        <TableHeaderCell colSpan={2} scope="row" className="text-right">
                            {data.length}
                        </TableHeaderCell>
                        <TableHeaderCell colSpan={3} scope="row" className="text-right">
                            {data.length}
                        </TableHeaderCell>
                    </TableRow>
                </TableFoot>
            </Table>
        </TableRoot>
    )
}
