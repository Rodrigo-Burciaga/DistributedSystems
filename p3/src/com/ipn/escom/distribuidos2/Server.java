package com.ipn.escom.distribuidos2;

import java.util.Scanner;

public class Server {

	public static void main(String... args) {
		Scanner in = new Scanner(System.in);
		Boolean nan = true;
		String name = null;
		Integer port = null;
		while (nan) {
			try {
				System.out.println("Enter name of server:");
				name = in.nextLine();
				System.out.println("Enter port of server:");
				port = in.nextInt();
				in.nextLine();
				nan = false;
			} catch (Exception e) {
				in.nextLine();
				System.out.println("Invalid character");
			}
		}
		in.close();
		new ServerCentralized(port, name).start();

	}

}
