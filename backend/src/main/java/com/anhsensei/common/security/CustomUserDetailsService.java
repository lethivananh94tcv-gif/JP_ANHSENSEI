package com.anhsensei.common.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Foundational stub: will be wired with Identity UserRepository when implemented
        throw new UsernameNotFoundException("User not found with email : " + username);
    }

    public UserDetails loadUserById(Long id) {
        // Foundational stub: will be wired with Identity UserRepository when implemented
        throw new UsernameNotFoundException("User not found with id : " + id);
    }
}
