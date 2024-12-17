import { useState, ChangeEvent } from "react";
import { QRCode } from "react-qrcode-logo";

function QrCodeGenerator() {
  const [ecLevel, setEcLevel] = useState<"H" | "L" | "M" | "Q">("M");
  const [formData, setFormData] = useState({
    value: "",
    ecLevel: "H",
    enableCORS: false,
    size: 100,
    quietZone: 10,
    bgColor: "#ffffff",
    fgColor: "#000000",
    logoImage: "",
    logoWidth: 50,
    logoHeight: 50,
    logoOpacity: 1,
    removeQrCodeBehindLogo: false,
    logoPadding: 10,
    logoPaddingStyle: "circle",
    qrStyle: "squares",
    eyeRadius: {
      outer: [0, 0, 0],
      inner: [0, 0, 0],
    },
    
  });

  const handleEcLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEcLevel(e.target.value as "H" | "L" | "M" | "Q"); // Asegura que el valor sea uno de los valores esperados
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Verifica si files existe
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, logoImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container">
      <div className="qr-generator">
        <h1 className="title">QR Code Generator</h1>
        <form className="qr-form">
          {/* Value Input*/}
          <label>
            Texto o URL:
            <input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Ejemplo Texto o http://EjemploURL"
            />
          </label>

          {/* Error Correction Level */}
          <label>
            Nivel de Corrección:
            <select value={ecLevel} onChange={handleEcLevelChange}>
              <option value="H">Alto</option>
              <option value="M">Medio</option>
              <option value="L">Bajo</option>
            </select>
          </label>

          {/* Enable CORS */}
          <label>
            Enable CORS:
            <input
              type="checkbox"
              name="enableCORS"
              checked={formData.enableCORS}
              onChange={handleChange}
            />
          </label>

          {/* Size and Quiet Zone */}
          <label>Size: {formData.size}px</label>
          <input
            type="number"
            name="size"
            min="100"
            max="500"
            value={formData.size}
            onChange={handleChange}
          />

          <label>Quiet Zone: {formData.quietZone}px</label>
          <input
            type="range"
            name="quietZone"
            min="0"
            max="50"
            value={formData.quietZone}
            onChange={handleChange}
          />

          {/* Colors */}
          <label>
            Background Color:
            <input
              type="color"
              name="bgColor"
              value={formData.bgColor}
              onChange={handleChange}
            />
          </label>

          <label>
            Foreground Color:
            <input
              type="color"
              name="fgColor"
              value={formData.fgColor}
              onChange={handleChange}
            />
          </label>

          {/* Logo Image */}
          <label>
            Logo Image (URL):
            <input
              type="text"
              name="logoImage"
              value={formData.logoImage}
              onChange={handleChange}
              placeholder="Paste image URL here"
            />
          </label>

          <label>
            Or Select File:
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </label>

          {/* Logo Attributes */}
          <label>Logo Width: {formData.logoWidth}px</label>
          <input
            type="range"
            name="logoWidth"
            min="10"
            max="100"
            value={formData.logoWidth}
            onChange={handleChange}
          />

          <label>Logo Height: {formData.logoHeight}px</label>
          <input
            type="range"
            name="logoHeight"
            min="10"
            max="100"
            value={formData.logoHeight}
            onChange={handleChange}
          />

          <label>Logo Opacity: {formData.logoOpacity}</label>
          <input
            type="range"
            name="logoOpacity"
            min="0.1"
            max="1"
            step="0.1"
            value={formData.logoOpacity}
            onChange={handleChange}
          />

          {/* QR Style */}
          <label>
            QR Style:
            <select
              name="qrStyle"
              value={formData.qrStyle}
              onChange={handleChange}
            >
              <option value="squares">Squares</option>
              <option value="dots">Dots</option>
            </select>
          </label>

          {/* Logo Padding */}
          <label>Logo Padding:</label>
          <input
            type="range"
            name="logoPadding"
            min="0"
            max="20"
            value={formData.logoPadding}
            onChange={handleChange}
          />

          <label>
            Logo Padding Style:
            <select
              name="logoPaddingStyle"
              value={formData.logoPaddingStyle}
              onChange={handleChange}
            >
              <option value="circle">Circle</option>
              <option value="square">Square</option>
            </select>
          </label>

          {/* Remove QR Code Behind Logo */}
          <label>
            Remove QR Code Behind Logo:
            <input
              type="checkbox"
              name="removeQrCodeBehindLogo"
              checked={formData.removeQrCodeBehindLogo}
              onChange={handleChange}
            />
          </label>
        </form>

        {/* QR Code Preview */}
        <div className="qr-preview">
          <QRCode
            value={formData.value}
            size={formData.size}
            bgColor={formData.bgColor}
            fgColor={formData.fgColor}
            ecLevel={ecLevel}
          />
        </div>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
