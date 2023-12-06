export default function ExportPanel({ config, setConfig, active }) {
    return (
        <div style={{
            display: active ? 'flex' : 'none',
            justifyContent: 'space-between'
        }}>
            Export
        </div>
    )
}