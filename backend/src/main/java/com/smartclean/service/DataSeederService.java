package com.smartclean.service;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.ApplicationArguments;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataSeederService implements ApplicationRunner {
    @Override
    public void run(ApplicationArguments args) throws Exception {
        // Seed initial data
    }
}
