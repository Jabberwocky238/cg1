import { useState } from "react"
import { useWalletContext } from "../hooks/WalletContext";
import { useArweaveContext } from "../hooks/ArweaveContext";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import { insertUpload } from "../api";

function generatePageId() {
    const uuid = crypto.getRandomValues(new Uint8Array(16));
    const hex = Array.from(uuid, (byte) => byte.toString(16).padStart(2, '0')).join('');
    return hex;
}

export function TableUpload() {
    const { arweave } = useArweaveContext();
    const [tags, setTags] = useState<{ name: string, value: string }[]>([]);
    const [data, setData] = useState<string>("");
    const [key, setKey] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [pageId, setPageId] = useState<string>("");
    const [fee, setFee] = useState<string>("0");
    const { isWalletConnected } = useWalletContext();

    const handleAddTagWith = ({ name, value }: { name: string, value: string }) => {
        setTags([...tags, { name: name, value: value }]);
    };

    const handleAddTag = () => {
        setTags([...tags, { name: key, value: value }]);
        setKey("");
        setValue("");
    };

    const handleClearTags = () => {
        setTags([]);
    };

    const handleRemoveTag = (name: string) => {
        setTags(tags.filter((tag) => tag.name !== name));
    };

    const handleSubmit = async () => {
        const tx = await arweave.createTransaction({
            data: data,
            reward: fee,
        })
        tags.forEach((tag) => {
            tx.addTag(tag.name, tag.value);
        });
        console.log(tx);
        const activeAddress = await window.arweaveWallet.getActiveAddress()!;
        console.log(activeAddress);
        alert(`Active public key: ${activeAddress}`);

        const info = `
        reward:\n
        ${fee}\n\n
        data:\n
        ${data}\n\n
        tags:\n
        ${tags.map((tag) => `${tag.name}: ${tag.value}`).join("\n")}
        `
        const confirmed = confirm(`是否要提交\n${info}`);
        if (confirmed) {
            try {
                // 先签名
                // const signedTx = await window.arweaveWallet.sign(tx);
                // console.log(signedTx);
                // 再提交
                let result = await window.arweaveWallet.dispatch(tx);
                console.log(result);
                setData(JSON.stringify(result));

                const confirmed = confirm(`是否要插入 ${activeAddress} ${result.id} ${pageId} ${JSON.stringify(tags)}`);
                if (confirmed) {
                    await insertUpload({
                        uploader_wallet_pubkey: activeAddress,
                        transaction_id: result.id,
                        page_id: pageId,
                        meta_tags_json: JSON.stringify(tags),
                    });
                }
            } catch (error) {
                console.error(error);
                alert(JSON.stringify(error));
            }
        }
    };

    return (
        <div className="w-full p-16 max-w-screen-lg mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
                <div className="max-w-xs space-y-2">
                    <Label htmlFor="key">tag key</Label>
                    <Input placeholder="Enter tag key" value={key} onChange={(e) => setKey(e.target.value)} id="key" name="key" type="text" />
                </div>
                <div className="max-w-xs space-y-2">
                    <Label htmlFor="value">tag value</Label>
                    <Input placeholder="Enter tag value" value={value} onChange={(e) => setValue(e.target.value)} id="value" name="value" type="text" />
                </div>
                <Button variant="primary" onClick={handleAddTag}>add tag</Button>
                <Button variant="secondary" onClick={handleClearTags}>clear tags</Button>
            </div>
            <div className="flex flex-wrap flex-row justify-center gap-2">
                <Label htmlFor="fee">fee</Label>
                <Input placeholder="Enter fee" value={fee} onChange={(e) => setFee(e.target.value)} id="fee" name="fee" type="number" />
            </div>
            <div className="flex flex-wrap flex-col justify-center items-center gap-1 mt-4">
                <div className="flex flex-wrap justify-center gap-6">
                    HELPER: Content-Type: text/html
                    <Button variant="secondary" onClick={() =>
                        handleAddTagWith({ name: "Content-Type", value: "text/html" })}>
                        add Content-Type: text/html
                    </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    HELPER: User-Agent: CG1
                    <Button variant="secondary" onClick={() =>
                        handleAddTagWith({ name: "User-Agent", value: "CG1" })}>
                        add User-Agent: CG1
                    </Button>
                </div>
                <div className="flex flex-wrap justify-center gap-6">
                    HELPER: Page-Key: {pageId}
                    <Button variant="secondary" onClick={() => { setPageId(generatePageId()) }}>
                        generate Page-Key
                    </Button>
                    <Button variant="secondary" disabled={!pageId} onClick={() => {
                        handleAddTagWith({ name: "Page-Key", value: pageId })
                    }}>
                        add Page-Key
                    </Button>
                </div>
                {tags.map((tag) => (
                    <div key={tag.name} className="flex flex-wrap justify-center gap-6">
                        <h3 className="text-xl font-bold bg-gray-900 p-2 rounded-md">{tag.name}: {tag.value}</h3>
                        <Button variant="secondary" onClick={() => handleRemoveTag(tag.name)}>remove tag</Button>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Label htmlFor="data">data</Label>
                <Input placeholder="Enter data" value={data} onChange={(e) => setData(e.target.value)} id="data" name="data" type="text" />
                <Button variant="primary" onClick={handleSubmit}>submit</Button>
            </div>
        </div>
    )
}