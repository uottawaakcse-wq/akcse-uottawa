'use client';

import { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { PDFDocument, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

export default function JoinForm({ dict }: { dict: any }) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Expanded Form State
  const [formData, setFormData] = useState({
    koreanName: '',
    englishName: '',
    gender: '',
    ageGroup: '',
    currentJob: '',
    organization: '',
    department: '',
    position: '',
    email: '',
    field: '',
    specificField: '',
    country: '',
    association: '',
    nationality: '',
    phone: '',
    year: '',
    month: '',
    date: '',
    agreed: false,
  });

  // Auto-fill today's date when the component loads
  useEffect(() => {
    const today = new Date();
    setFormData(prev => ({
      ...prev,
      year: today.getFullYear().toString(),
      month: (today.getMonth() + 1).toString(),
      date: today.getDate().toString()
    }));
  }, []);

  const handleGeneratePDF = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
      alert("Please provide a signature before submitting.");
      return;
    }

    setIsGenerating(true);

    try {
      const signatureImageBase64 = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
      const existingPdfBytes = await fetch('/akcse-form-blank.pdf').then(res => res.arrayBuffer());
      
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      pdfDoc.registerFontkit(fontkit);
      const fontBytes = await fetch('/NotoSansKR-Regular.ttf').then(res => res.arrayBuffer());
      const koreanFont = await pdfDoc.embedFont(fontBytes);

      const pages = pdfDoc.getPages();
      const targetPage = pages[0]; // Change to 1 if the form fields are on the second page!
      

      // TEXT DRAWING CONFIG
      const textOpts = { size: 10, font: koreanFont };
      const text1pts = { size: 5, font: koreanFont };

      // === YOU MUST ADJUST THESE X AND Y COORDINATES USING THE RED GRID ===
      
      // Row 1
      targetPage.drawText(formData.koreanName, { x: 225, y: 675, ...textOpts });
      targetPage.drawText(formData.englishName, { x: 425, y: 675, ...textOpts });
      
      // Row 2
      

      targetPage.drawText(formData.gender, { x: 225, y: 630, ...textOpts });

      if (formData.ageGroup == "20~29"){
        targetPage.drawText("v", { x: 465.5, y: 652, ...textOpts });
      } else if (formData.ageGroup == "Below 20") {
        targetPage.drawText("v", { x: 423.25, y: 652, ...textOpts });
      } else if (formData.ageGroup == "30~39") {
        targetPage.drawText("v", { x: 499, y: 652, ...textOpts });
      }
      
      
      // Row 3

      if (formData.currentJob == "Academy"){
        targetPage.drawText("v", { x: 282.25, y: 612.5, ...textOpts });
      } else if (formData.currentJob == "Research Institute"){
        targetPage.drawText("v", { x: 333.25, y: 612.5, ...textOpts });
      } else if (formData.currentJob == "Industry"){
        targetPage.drawText("v", { x: 418.5, y: 612.5, ...textOpts });
      } else if (formData.currentJob == "etc.") {
        targetPage.drawText("v", { x: 461.5, y: 612.5, ...textOpts });
      }
      
      targetPage.drawText(formData.organization, { x: 325, y: 587.5, ...textOpts });
      
      // Row 4
      targetPage.drawText(formData.department, { x: 325, y: 570, ...textOpts });
      targetPage.drawText(formData.position, { x: 325, y: 550, ...textOpts });
      
      // Row 5
      targetPage.drawText(formData.email, { x: 325, y: 531, ...textOpts });
      targetPage.drawText(formData.phone, { x: 150, y: 454, ...textOpts });
      
      // Row 6
      targetPage.drawText(formData.field, { x: 150, y: 512.5, ...textOpts });
      targetPage.drawText(formData.specificField, { x: 425, y: 512.5, ...textOpts });
      
      // Row 7
      targetPage.drawText(formData.country, { x: 150, y: 492, ...textOpts });
      targetPage.drawText(formData.association, { x: 424, y: 492, ...textOpts });
      targetPage.drawText(formData.nationality, { x: 150, y: 475, ...textOpts });

      // Date Block (Usually at the bottom near signature)
      pages[1].drawText(formData.year, { x: 273, y: 323.5, ...textOpts });
      pages[1].drawText(formData.month, { x: 312, y: 323.5, ...textOpts });
      pages[1].drawText(formData.date, { x: 328, y: 323.5, ...textOpts });
      pages[1].drawText(formData.englishName, { x: 382, y: 323.5, ...text1pts });

      // Embed the signature image
      const signatureImageBytes = await fetch(signatureImageBase64).then(res => res.arrayBuffer());
      const embeddedSignature = await pdfDoc.embedPng(signatureImageBytes);
      const sigDims = embeddedSignature.scale(0.5); 
      
      pages[1].drawImage(embeddedSignature, {
        x: 420, // Adjust X coordinate for Signature
        y: 313, // Adjust Y coordinate for Signature
        width: (sigDims.width)/2, 
        height: (sigDims.height)/2,
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `AKCSE_Application_${formData.englishName.replace(/\s+/g, '_')}.pdf`;
      link.click();

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Something went wrong while generating the document.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Reusable input styling
  const inputClass = "w-full border border-black/20 p-3 outline-none focus:border-[#8F001A] transition-colors bg-white";
  const labelClass = "font-mono text-xs uppercase tracking-widest text-gray-500 mb-2 block";

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 lg:p-12 border border-black/10">
      <form onSubmit={handleGeneratePDF} className="space-y-12">
        
        {/* SECTION 1: Personal Information */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-black/10 pb-2">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Korean Name</label>
              <input type="text" required className={inputClass} onChange={e => setFormData({...formData, koreanName: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>English Name</label>
              <input type="text" required placeholder="(Last Name, Given Name)" className={inputClass} onChange={e => setFormData({...formData, englishName: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Gender</label>
              <select required className={inputClass} onChange={e => setFormData({...formData, gender: e.target.value})}>
                <option value="">Select Gender</option>
                <option value="Agender">Agender</option>
                <option value="Androgyne">Androgyne</option>
                <option value="Binary">Binary</option>
                <option value="Bigender">Bigender</option>
                <option value="Demi-boy">Demi-boy</option>
                <option value="Demi-girl">Demi-girl</option>
                <option value="Female">Female</option>
                <option value="Trans Male">Trans Male</option>
                <option value="Trans Female">Trans Female</option>
                <option value="Genderfluid">Genderfluid</option>
                <option value="Genderless">Genderless</option>
                <option value="Gender Non-Conforming">Gender Non-Conforming</option>
                <option value="Genderqueer">Genderqueer</option>
                <option value="Intergender">Intergender</option>
                <option value="Intersex">Intersex</option>
                <option value="Male">Male</option>
                <option value="Monogender">Monogender</option>
                x<option value="Non-binary">Non-binary</option>
                <option value="Omnigender">Omnigender</option>
                <option value="Pangender">Pangender</option>
                <option value="Polygender">Polygender</option>
                <option value="Questionary">Questionary</option>
                <option value="Third-Gender">Third-Gender</option>
                <option value="Tri-Gender">Tri-Gender</option>
                <option value="Unigender">Unigender</option>
                <option value="Two-Spirit">Two-Spirit</option>
                <option value="X-gender">X-gender</option>
                <option value="Prefer Not to Answer">Prefer Not to Answer</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Age Group</label>
              <select required className={inputClass} onChange={e => setFormData({...formData, ageGroup: e.target.value})}>
                <option value="">Select Age Group</option>
                <option value="Below 20">Below 20</option>
                <option value="20~29">20~29</option>
                <option value="30~39">30~39</option>
                <option value="40~49">40~49</option>
                <option value="50~59">50~59</option>
                <option value="60~69">60~69</option>
                <option value="70+">70+</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Nationality</label>
              <input type="text" required className={inputClass} onChange={e => setFormData({...formData, nationality: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Country of Residence</label>
              <input type="text" required className={inputClass} onChange={e => setFormData({...formData, country: e.target.value})} />
            </div>
          </div>
        </div>

        {/* SECTION 2: Professional Information */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-black/10 pb-2">Professional Affiliation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Current Job</label>
              <select required className={inputClass} onChange={e => setFormData({...formData, currentJob: e.target.value})}>
                <option value="">Select Job Type</option>
                <option value="Academy">Academy</option>
                <option value="Research Institute">Research Institute</option>
                <option value="Industry">Industry</option>
                <option value="etc.">etc.</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Name of Organization</label>
              <input type="text" required placeholder="e.g. University of Ottawa" className={inputClass} onChange={e => setFormData({...formData, organization: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Department</label>
              <input type="text" required placeholder="e.g. Faculty of Engineering" className={inputClass} onChange={e => setFormData({...formData, department: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Position</label>
              <input type="text" required placeholder="e.g. Undergraduate Student" className={inputClass} onChange={e => setFormData({...formData, position: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Field (Major)</label>
              <input type="text" required className={inputClass} onChange={e => setFormData({...formData, field: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Specific Field</label>
              <input type="text" required className={inputClass} onChange={e => setFormData({...formData, specificField: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Association</label>
              <input type="text" required placeholder="e.g. AKCSE" className={inputClass} onChange={e => setFormData({...formData, association: e.target.value})} />
            </div>
          </div>
        </div>

        {/* SECTION 3: Contact Details */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-black/10 pb-2">Contact Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" required className={inputClass} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Phone Number</label>
              <input type="tel" required className={inputClass} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
          </div>
        </div>

        {/* SECTION 4: Date & Consent */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-black/10 pb-2">Consent & Verification</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className={labelClass}>Year</label>
              <input type="text" value={formData.year} className={inputClass} onChange={e => setFormData({...formData, year: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Month</label>
              <input type="text" value={formData.month} className={inputClass} onChange={e => setFormData({...formData, month: e.target.value})} />
            </div>
            <div>
              <label className={labelClass}>Day</label>
              <input type="text" value={formData.date} className={inputClass} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
          </div>

          <div className="bg-[#FAFAFA] p-6 border border-black/10 mb-6">
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            캐나다한인과학기술자협회(AKCSE)는 한국과학기술단체총연합회(KOFST)의 재외과협 육성지원사업을 통해 다양한 사업 및 운영 지원을 받고 있습니다. 이에
따라, 협회 회원분들의 동의하에 전문 분야와 관련된 개인 정보를 한국과총과 공유하여, 과학정책 수립 및 자문이 필요할 때 참여할 수 있습니다. 제공해 주신 개인
정보는 철저히 보호되며, 절대 유출되거나 다른 목적으로 사용되지 않습니다. The Association of Korean-Canadian Scientists and Engineers
(AKCSE) receives support for various projects and operations through the Korean Federation of Science and Technology Societies
(KOFST) program for fostering overseas Korean scientists and engineers associations. With the consent of its members, AKCSE
encourages the sharing of professional information related to their areas of expertise with KOFST, facilitating participation in the
development of science policies and advisory activities. The personal information you provide will be strictly protected and will
never be disclosed or used for any other purposes.
1. 본인은 한국과학기술단체총연합회의 해외한인과학기술인 인력DB 사업과 관련하여 다음 각호의 정보를 수집･
 이용하는 것에 동의합니다.
가. 수집･이용목적
① 정부정책결정, 주요 국책사업 기획 및 평가위원, 공동연구자로 참여
② 정부 주요연구과제 평가 및 피어리뷰어 후보군으로 등록
③ 국가 과학기술정책 수립 시 자문의뢰 등
④ 공학·자연과학·의학 등 과학기술 관련 분야 인재 초빙 및 채용 등 인력교류 후보군으로 등록
⑤ 글로벌과학기술교류협력사업(세계 한인 과학기술인대회, BrainLink 사업 등)의 초빙과학자 및 초청연사 추천
나. 수집하는 개인정보의 항목
성명, 성별, 생년, 소속기관, 부서, 직위, 회사전화번호, Mobile 번호, 주소, email, 국적, 거주국가, 전공분야,
세부전공, 학력(학교, 전공, 학위, 연구분야 등), 경력(기간, 직위 등), 수상, 특허/프로그램 출원, 등록실적, 연구
논문 발표실적, 대한민국과 공동연구를 경험했거나 교류했던 관계자 정보, 개인 강점 분야, QR, 기타 특이사항 등
2. 본인은 한국과학기술단체총연합회가 본인의 개인정보를 동의서가 작성된 때로부터 1항의 사용목적으로 활용•보유하는데 동의합니다.
3. 본인은 제1항의 정보를 비롯, 사업수행과정에서 추가적으로 제공되는 개인정보를 관련법령 및 국가연구개발사업 관련 규정에 따라 각 중앙행정기관에 제공하
는 것을 동의합니다.
4. 본인은 상기 개인정보의 수집에 대하여 거부할 권리를 보유하고 있으며, 동의를 거부하면 보유명단에서 제외될 수 있다는 사실을 인지한 상태에서 작성한 것임
을 확인합니다.
            </p>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" required
                className="w-5 h-5 accent-[#8F001A]"
                onChange={e => setFormData({...formData, agreed: e.target.checked})}
              />
              <span className="font-bold text-sm group-hover:text-[#8F001A] transition-colors">
                I agree to the personal information usage policy. (동의함)
              </span>
            </label>
          </div>

          {/* Digital Signature Pad */}
          <div>
            <label className={labelClass}>Applicant Signature</label>
            <div className="border-2 border-dashed border-gray-300 bg-[#FAFAFA] h-48 relative hover:border-[#8F001A]/50 transition-colors">
              <SignatureCanvas 
                ref={sigCanvas}
                penColor="black"
                canvasProps={{className: 'w-full h-full absolute inset-0 cursor-crosshair'}}
              />
            </div>
            <button 
              type="button" 
              onClick={() => sigCanvas.current?.clear()} 
              className="text-xs font-mono text-gray-400 mt-2 hover:text-black uppercase tracking-widest"
            >
              [ Clear Signature ]
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isGenerating}
          className="w-full bg-[#8F001A] text-white py-4 font-bold tracking-widest uppercase hover:bg-black transition-colors disabled:opacity-50 mt-8"
        >
          {isGenerating ? 'Generating PDF...' : 'Sign & Generate PDF'}
        </button>

      </form>
    </div>
  );
}