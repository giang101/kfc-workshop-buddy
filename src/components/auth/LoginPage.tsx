import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 9) {
      toast({
        title: "Số điện thoại không hợp lệ",
        description: "Vui lòng nhập số điện thoại hợp lệ",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      toast({
        title: "Mã OTP đã được gửi",
        description: `Vui lòng kiểm tra tin nhắn tại số +84${phoneNumber}`,
      });
    }, 1500);
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Mã OTP không hợp lệ",
        description: "Vui lòng nhập mã OTP gồm 6 chữ số",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng đến với KFC Workshop",
      });
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* KFC Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">KFC</span>
            </div>
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">PEPSI</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">KFC Workshop</h1>
          <p className="text-muted-foreground">Đăng ký tham gia Workshop dành cho bé</p>
        </div>

        <Card className="shadow-2xl border-0 animate-slide-up">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-foreground">
              {step === 'phone' ? 'Đăng nhập' : 'Xác thực OTP'}
            </CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'Nhập số điện thoại để tiếp tục' 
                : `Mã OTP đã được gửi tới +84${phoneNumber}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 'phone' ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại <span className="text-primary">*</span></Label>
                  <PhoneInput
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleSendOTP}
                  className="w-full"
                  variant="kfc"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi mã OTP'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Mã OTP <span className="text-primary">*</span></Label>
                  <Input
                    id="otp"
                    placeholder="Nhập mã OTP 6 chữ số"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                </div>
                <div className="space-y-3">
                  <Button 
                    onClick={handleVerifyOTP}
                    className="w-full"
                    variant="kfc"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang xác thực...' : 'Xác thực'}
                  </Button>
                  <Button 
                    onClick={() => setStep('phone')}
                    variant="ghost"
                    className="w-full"
                  >
                    Quay lại
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Điều khoản dịch vụ
            </span>{" "}
            và{" "}
            <span className="text-primary cursor-pointer hover:underline">
              Chính sách bảo mật
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};