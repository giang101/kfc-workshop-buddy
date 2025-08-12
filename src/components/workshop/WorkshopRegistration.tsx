import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Calendar, Clock, User, Phone, ImageIcon, CheckCircle } from "lucide-react";

interface WorkshopRegistrationProps {
  onRegistrationSuccess: (data: { preferredDate: string; preferredTime: string }) => void;
}

export const WorkshopRegistration = ({ onRegistrationSuccess }: WorkshopRegistrationProps) => {
  const [formData, setFormData] = useState({
    childName: '',
    childAge: '',
    workshopDate: '',
    workshopTime: '',
    parentPhone: '',
    receiptFile: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File quá lớn",
          description: "Vui lòng chọn file nhỏ hơn 5MB",
          variant: "destructive",
        });
        return;
      }
      setFormData(prev => ({ ...prev, receiptFile: file }));
    }
  };

  const validateForm = () => {
    const { childName, childAge, workshopDate, workshopTime, parentPhone, receiptFile } = formData;
    
    if (!childName.trim()) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập họ và tên con",
        variant: "destructive",
      });
      return false;
    }

    if (!childAge || parseInt(childAge) < 3 || parseInt(childAge) > 15) {
      toast({
        title: "Tuổi không hợp lệ",
        description: "Tuổi con phải từ 3-15 tuổi",
        variant: "destructive",
      });
      return false;
    }

    if (!workshopDate) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn ngày tham gia",
        variant: "destructive",
      });
      return false;
    }

    if (!workshopTime) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng chọn giờ tham gia",
        variant: "destructive",
      });
      return false;
    }

    if (!parentPhone || parentPhone.length < 9) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Vui lòng nhập số điện thoại hợp lệ",
        variant: "destructive",
      });
      return false;
    }

    if (!receiptFile) {
      toast({
        title: "Thiếu hóa đơn",
        description: "Vui lòng upload ảnh hóa đơn từ 99.000đ",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call for slot checking and registration
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Send SMS notification (simulated)
      setTimeout(() => {
        toast({
          title: "SMS xác nhận đã gửi",
          description: `Tin nhắn xác nhận đã được gửi tới +84${formData.parentPhone}`,
        });
        onRegistrationSuccess({
          preferredDate: formData.workshopDate,
          preferredTime: formData.workshopTime
        });
      }, 2000);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-success/10 to-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 animate-fade-in">
          <CardContent className="text-center py-8">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Đăng ký thành công!</h2>
            <p className="text-muted-foreground mb-6">
              Bạn đã đăng ký Workshop thành công cho bé <strong>{formData.childName}</strong>.
              <br />
              Ngày: <strong>{formData.workshopDate}</strong>
              <br />
              Giờ: <strong>{formData.workshopTime}</strong>
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-success/10 rounded-lg">
                <p className="text-sm text-success-foreground">
                  📱 SMS xác nhận đã được gửi tới số điện thoại của bạn
                </p>
              </div>
              <Button 
                onClick={() => onRegistrationSuccess({
                  preferredDate: formData.workshopDate,
                  preferredTime: formData.workshopTime
                })}
                variant="kfc"
                size="lg"
                className="w-full"
              >
                Hoàn thành
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background p-4">
      <div className="max-w-2xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">KFC</span>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs">PEPSI</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Đăng ký Workshop</h1>
          <p className="text-muted-foreground">
            Vui lòng điền đầy đủ và chính xác thông tin để đảm bảo mã quà tặng được gửi đến đúng người nhận.
          </p>
        </div>

        <Card className="shadow-2xl border-0 animate-slide-up">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Thông tin đăng ký</CardTitle>
            <CardDescription>
              Điền thông tin để đăng ký Workshop cho con bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Child Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Thông tin con</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childName">Họ và Tên <span className="text-primary">*</span></Label>
                  <Input
                    id="childName"
                    placeholder="Nhập Họ và Tên"
                    value={formData.childName}
                    onChange={(e) => handleInputChange('childName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="childAge">Tuổi <span className="text-primary">*</span></Label>
                  <Input
                    id="childAge"
                    type="number"
                    placeholder="Nhập tuổi (3-15)"
                    min="3"
                    max="15"
                    value={formData.childAge}
                    onChange={(e) => handleInputChange('childAge', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Workshop Schedule */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Lịch Workshop</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="workshopDate">Ngày/ tháng/ năm sinh <span className="text-primary">*</span></Label>
                  <Input
                    id="workshopDate"
                    type="date"
                    value={formData.workshopDate}
                    onChange={(e) => handleInputChange('workshopDate', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workshopTime">Giờ tham gia <span className="text-primary">*</span></Label>
                  <select 
                    id="workshopTime"
                    className="flex h-12 w-full rounded-lg border border-input-border bg-input px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:border-primary"
                    value={formData.workshopTime}
                    onChange={(e) => handleInputChange('workshopTime', e.target.value)}
                  >
                    <option value="">Chọn giờ</option>
                    <option value="09:00">09:00 - 11:00</option>
                    <option value="14:00">14:00 - 16:00</option>
                    <option value="16:30">16:30 - 18:30</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent Contact */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Phone className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Số điện thoại <span className="text-primary">*</span></Label>
                <PhoneInput
                  id="parentPhone"
                  placeholder="Nhập số điện thoại"
                  value={formData.parentPhone}
                  onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                />
              </div>
            </div>

            {/* Receipt Upload */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Hóa đơn mua hàng</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="receipt">Upload ảnh hóa đơn ≥ 99.000đ <span className="text-primary">*</span></Label>
                <div className="relative">
                  <input
                    id="receipt"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-input-border rounded-lg bg-input hover:bg-accent transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        {formData.receiptFile ? formData.receiptFile.name : 'Chọn ảnh hóa đơn'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, PNG tối đa 5MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
              <input type="checkbox" id="terms" className="mt-1" defaultChecked />
              <label htmlFor="terms" className="text-sm text-muted-foreground">
                Tôi đồng ý với{" "}
                <span className="text-primary cursor-pointer hover:underline">
                  Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân và Chính sách xử lý dữ liệu cá nhân.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleSubmit}
              disabled={isLoading}
              variant="kfc"
              size="xl"
              className="w-full"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};