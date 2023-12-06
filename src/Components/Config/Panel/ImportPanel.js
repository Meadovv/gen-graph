export default function ImportPanel({ config, setConfig, active }) {
    return (
        <div style={{
            display: active ? 'flex' : 'none',
            justifyContent: 'space-between'
        }}>
            Import
        </div>
    )
}