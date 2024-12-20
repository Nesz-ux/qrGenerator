import { useState, ChangeEvent } from "react";
import { QRCode } from "react-qrcode-logo";
import "../styles/QrGeneratorStyle.css"

function QrCodeGenerator() {
  const [ecLevel, setEcLevel] = useState<"H" | "L" | "M">("M");
  const [qrStyle, setQrStyle] = useState<"squares" | "dots" | "fluid">(
    "squares"
  );
  const [paddingImageStyle, setPaddingImageStyle] = useState<
    "square" | "circle"
  >("square");

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
    logoPadding: 10,
    qrStyle: "squares",
    logoPaddingStyle: "circle",
    eyeRadius: {
      outer: [0, 0, 0],
      inner: [0, 0, 0],
    },
  });

  const handleEcLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEcLevel(e.target.value as "H" | "L" | "M");
  };
  const handleQrStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQrStyle(e.target.value as "squares" | "dots" | "fluid");
  };
  const handlePaddingImageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaddingImageStyle(e.target.value as "square" | "circle");
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
        <h1 className="title">QR Code Generator</h1>
        <div className="form-preview-container">
          <form className="qr-form">
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

            <label>
              Nivel de Corrección:
              <select value={ecLevel} onChange={handleEcLevelChange}>
                <option value="H">Alto</option>
                <option value="M">Medio</option>
                <option value="L">Bajo</option>
              </select>
            </label>

            <label>Tamaño: {formData.size}px</label>
            <input
              type="number"
              name="size"
              max="600"
              value={formData.size}
              onChange={handleChange}
            />

            <label>Margen: {formData.quietZone}px</label>
            <input
              type="range"
              name="quietZone"
              min="0"
              max="50"
              value={formData.quietZone}
              onChange={handleChange}
            />

            <label>
              Color de Fondo:
              <input
                type="color"
                name="bgColor"
                value={formData.bgColor}
                onChange={handleChange}
              />
            </label>

            <label>
              Color de QR:
              <input
                type="color"
                name="fgColor"
                value={formData.fgColor}
                onChange={handleChange}
              />
            </label>

            <label>
              Imagen (URL):
              <input
                type="text"
                name="logoImage"
                value={formData.logoImage}
                onChange={handleChange}
                placeholder="Pegar URL aquí"
              />
            </label>

            <label>
              O Selecciona un Archivo:
              <input type="file" accept="image/*" onChange={handleFileUpload} />
            </label>

            {/* Logo Attributes */}
            <label>Ancho Imagen: {formData.logoWidth}px</label>
            <input
              type="range"
              name="logoWidth"
              min="10"
              max="100"
              value={formData.logoWidth}
              onChange={handleChange}
            />

            <label>Alto Imagen: {formData.logoHeight}px</label>
            <input
              type="range"
              name="logoHeight"
              min="10"
              max="100"
              value={formData.logoHeight}
              onChange={handleChange}
            />

            <label>Opacidad de Imagen: {formData.logoOpacity}</label>
            <input
              type="range"
              name="logoOpacity"
              min="0.1"
              max="1"
              step="0.1"
              value={formData.logoOpacity}
              onChange={handleChange}
            />

            <label>
              Estilo de QR:
              <select value={qrStyle} onChange={handleQrStyleChange}>
                <option value="squares">Cuadrado</option>
                <option value="dots">Puntos</option>
                <option value="fluid">Fluido</option>
              </select>
            </label>

            <label>Margen de la Imagen:</label>
            <input
              type="range"
              name="logoPadding"
              min="0"
              max="20"
              value={formData.logoPadding}
              onChange={handleChange}
            />

            <label>
              Estilo del Margen de la Imagen:
              <select
                value={paddingImageStyle}
                onChange={handlePaddingImageChange}
              >
                <option value="circle">Circular</option>
                <option value="square">Cuadrado</option>
              </select>
            </label>
          </form>

          {/* QR Code Preview */}
          <div className="qr-preview">
            <QRCode
              value={formData.value}
              ecLevel={ecLevel}
              size={formData.size}
              quietZone={formData.quietZone}
              bgColor={formData.bgColor}
              fgColor={formData.fgColor}
              logoImage={formData.logoImage}
              logoWidth={formData.logoWidth}
              logoHeight={formData.logoHeight}
              logoOpacity={formData.logoOpacity}
              qrStyle={qrStyle}
              logoPadding={formData.logoPadding}
              logoPaddingStyle={paddingImageStyle}
            />
          </div>
        </div>
      </div>
  );
}

export default QrCodeGenerator;
