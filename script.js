const form = document.getElementById('contactForm');
const qrcodeDiv = document.getElementById('qrcode');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const company = document.getElementById('company').value.trim();
  const title = document.getElementById('title').value.trim();
  const website = document.getElementById('website').value.trim();

  const vCard = `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
ORG:${company}
TITLE:${title}
TEL;TYPE=cell:${phone}
EMAIL:${email}
URL:${website}
END:VCARD`.trim();

  QRCode.toDataURL(vCard, function (err, url) {
    if (err) {
      qrcodeDiv.innerHTML = "<p style='color:red;'>Failed to generate QR Code.</p>";
      console.error(err);
      return;
    }

    qrcodeDiv.innerHTML = "<h3>Your Contact QR Code:</h3>";

    const img = document.createElement('img');
    img.src = url;
    img.alt = "Contact QR Code";
    img.style.marginBottom = "15px";
    qrcodeDiv.appendChild(img);

    // Create download button
    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `contact-qr-${firstName}-${lastName}.png`;
    downloadLink.textContent = "Download QR Code";
    downloadLink.style.display = "inline-block";
    downloadLink.style.marginTop = "10px";
    downloadLink.style.background = "#28a745";
    downloadLink.style.color = "#fff";
    downloadLink.style.padding = "10px 15px";
    downloadLink.style.borderRadius = "6px";
    downloadLink.style.textDecoration = "none";
    downloadLink.style.fontWeight = "bold";

    qrcodeDiv.appendChild(document.createElement('br'));
    qrcodeDiv.appendChild(downloadLink);
  });
});
