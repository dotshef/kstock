export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #E5E8EC', background: '#F9FAFB', marginTop: 80 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '28px 28px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#8B95A1', margin: 0 }}>
          © {new Date().getFullYear()} 투자그룹 플랜. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
