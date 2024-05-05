package com.cj.soloAlbum.util;


import java.security.Key;
import java.security.Security;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

public class Cyper {
	private static final String ALGORITHM = "SEED";
    private static final String PROVIDER = "BC"; // BouncyCastle provider
    
    static byte[] keyBytes = "YourSecretKey1234".getBytes();
    static Key key = new SecretKeySpec(keyBytes, ALGORITHM);

    // 데이터 암호화
    public static String encrypt(String plainText) throws Exception {
    	Security.addProvider(new BouncyCastleProvider());
        Cipher cipher = Cipher.getInstance(ALGORITHM, PROVIDER);
        cipher.init(Cipher.ENCRYPT_MODE, key);
        byte[] encryptedBytes = cipher.doFinal(plainText.getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }

    // 데이터 복호화
    public static String decrypt(String encryptedText) throws Exception {
    	Security.addProvider(new BouncyCastleProvider());
        Cipher cipher = Cipher.getInstance(ALGORITHM, PROVIDER);
        cipher.init(Cipher.DECRYPT_MODE, key);
        byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);
        byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
        return new String(decryptedBytes);
    }
}
