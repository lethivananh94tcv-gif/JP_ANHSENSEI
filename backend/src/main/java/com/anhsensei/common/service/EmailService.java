package com.anhsensei.common.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String toEmail, String codeOrToken) {
        String subject = "[ANH SENSEI] Mã xác thực tài khoản của bạn";
        String content = "Chào bạn,\n\nMã xác thực tài khoản ANH SENSEI của bạn là: " + codeOrToken +
                "\n\nMã này có hiệu lực trong 24 giờ. Vui lòng nhập mã này vào trang xác thực tài khoản.\n\nTrân trọng,\nĐội ngũ ANH SENSEI";

        sendEmailInternal(toEmail, subject, content, codeOrToken, "XÁC THỰC EMAIL");
    }

    public void sendPasswordResetEmail(String toEmail, String resetCodeOrToken) {
        String subject = "[ANH SENSEI] Mã đặt lại mật khẩu của bạn";
        String content = "Chào bạn,\n\nBạn đã gửi yêu cầu đặt lại mật khẩu cho tài khoản ANH SENSEI.\n" +
                "Mã Token đặt lại mật khẩu của bạn là:\n\n" + resetCodeOrToken + "\n\n" +
                "Mã này có hiệu lực trong 30 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai.\n\nTrân trọng,\nĐội ngũ ANH SENSEI";

        sendEmailInternal(toEmail, subject, content, resetCodeOrToken, "ĐẶT LẠI MẬT KHẨU");
    }

    public void sendOtpLoginEmail(String toEmail, String otpCode) {
        String subject = "[ANH SENSEI] Mã OTP đăng nhập của bạn";
        String content = "Chào bạn,\n\nMã OTP đăng nhập ANH SENSEI của bạn là: " + otpCode +
                "\n\nMã này có hiệu lực trong 5 phút. Vui lòng không chia sẻ cho ai khác.\n\nTrân trọng,\nĐội ngũ ANH SENSEI";

        sendEmailInternal(toEmail, subject, content, otpCode, "OTP ĐĂNG NHẬP");
    }

    private void sendEmailInternal(String toEmail, String subject, String content, String token, String type) {
        // Run email dispatch asynchronously in background thread so HTTP response is INSTANT
        CompletableFuture.runAsync(() -> {
            log.info("==========================================================");
            log.info(" [EMAIL SERVICE - {}]", type);
            log.info(" TO EMAIL : {}", toEmail);
            log.info(" SUBJECT  : {}", subject);
            log.info(" OTP CODE : {}", token);
            log.info("==========================================================");

            if (mailUsername != null && !mailUsername.isBlank()) {
                try {
                    SimpleMailMessage message = new SimpleMailMessage();
                    message.setFrom(mailUsername);
                    message.setTo(toEmail);
                    message.setSubject(subject);
                    message.setText(content);
                    mailSender.send(message);
                    log.info("Email [{}] đã được gửi thành công qua SMTP đến {}", type, toEmail);
                } catch (Exception e) {
                    log.error("Lỗi khi gửi email SMTP đến {}: ", toEmail, e);
                    log.warn("LƯU Ý: Mã OTP [{}] đã tạo cho email {} sẵn sàng để sử dụng.", token, toEmail);
                }
            }
        });
    }
}
