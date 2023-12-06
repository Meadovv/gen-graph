export default function AdvancedPanel({ config, setConfig, active }) {
    return (
        <div style={{
            display: active ? 'flex' : 'none',
            justifyContent: 'space-between'
        }}>
            Advanced
        </div>
    )
}